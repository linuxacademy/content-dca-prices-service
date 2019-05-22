FROM node

ENV PORT=80
ENV BASE_PRICE_HOST=base-price
ENV BASE_PRICE_PORT=80
ENV SALES_HOST=sales
ENV SALES_PORT=80

WORKDIR /app
ADD package.json .
RUN npm install
ADD index.js .

CMD ["node", "index.js"]
