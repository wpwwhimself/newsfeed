FROM php:8.2-apache
WORKDIR /var/www/html

RUN apt-get update && \
    apt-get install -y \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libzip-dev \
        zip \
        unzip \
        git

RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

COPY composer.lock composer.json ./

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-scripts --no-autoloader

COPY . .

RUN composer dump-autoload --optimize

EXPOSE 8000

CMD ["php", "artisan", "serve"]
