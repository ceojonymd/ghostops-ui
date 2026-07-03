/**
 * GhostOps UI — Admin route gating worker.
 *
 * Intercepts /admin/* and /dashboard/admin/* requests and checks for
 * a valid `ghostops_session` cookie. If missing → 302 to /login.
 * All other routes pass through to static assets (SPA fallback intact).
 */

const ADMIN_PATTERNS = ['/admin/', '/admin', '/dashboard/admin/', '/dashboard/admin'];

function isAdminRoute(pathname) {
  const lower = pathname.toLowerCase();
  return ADMIN_PATTERNS.some(
    (p) => lower === p || lower.startsWith(p + '/') || lower.startsWith(p + '?')
  );
}

function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? match[1] : null;
}

// Security headers applied to every response
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Gate admin routes — require ghostops_session cookie
    if (isAdminRoute(url.pathname)) {
      const session = getCookie(request, 'ghostops_session');
      if (!session) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/login',
            ...SECURITY_HEADERS,
          },
        });
      }
    }

    // Serve static assets via the built-in asset binding
    const response = await env.ASSETS.fetch(request);

    // Clone response and add security headers
    const secured = new Response(response.body, response);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      secured.headers.set(key, value);
    }
    return secured;
  },
};
