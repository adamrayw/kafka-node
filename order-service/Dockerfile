# Menggunakan Node.js sebagai base image
FROM node:14

# Mengatur working directory
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstall dependencies
RUN npm install

# Menyalin semua file ke dalam container
COPY . .

# Menjalankan aplikasi
CMD ["node", "index.js"]