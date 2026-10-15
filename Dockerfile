# Pin the Node.js major; bump deliberately. Runs as the unprivileged "node" user.
FROM node:22-alpine

ENV NODE_ENV=production \
    PORT=8080

WORKDIR /app

# Dependencies first, from the lock file only, so the layer is cached and reproducible.
COPY --chown=root:root package.json package-lock.json /app/
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY --chown=root:root server.js /app/
COPY --chown=root:root lib /app/lib
COPY --chown=root:root scripts /app/scripts
COPY --chown=root:root public /app/public

USER node
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD ["node", "-e", "require('http').get('http://127.0.0.1:'+(process.env.PORT||8080)+'/',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"]

CMD ["node", "server.js"]
