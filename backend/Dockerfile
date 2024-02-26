FROM bitnami/laravel:10.3.3

WORKDIR /var/www

# cron
RUN apt update && apt install -y cron
COPY crontab /etc/cron.d/crontab
RUN chmod 0644 /etc/cron.d/crontab
RUN crontab /etc/cron.d/crontab

COPY composer.lock composer.json ./

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-scripts --no-autoloader

COPY . .

RUN composer dump-autoload --optimize

EXPOSE 8000

COPY ./run.sh /tmp
ENTRYPOINT [ "/tmp/run.sh" ]

# CMD ["php", "artisan", "serve"]
