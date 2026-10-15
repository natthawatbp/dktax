# Pin the base image; bump deliberately. The -unprivileged variant runs as non-root.
FROM nginxinc/nginx-unprivileged:1.27-alpine

USER 101

COPY --chown=root:root deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=root:root Index.html _ds_bundle.js styles.css /usr/share/nginx/html/
COPY --chown=root:root tokens /usr/share/nginx/html/tokens
COPY --chown=root:root fonts /usr/share/nginx/html/fonts
COPY --chown=root:root assets /usr/share/nginx/html/assets

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/Index.html || exit 1
