#!/bin/bash

cd /var/www
php artisan migrate:fresh --seed --force
php artisan serve --host=0.0.0.0 --port=$APP_PORT
