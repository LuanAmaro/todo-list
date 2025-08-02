FROM php:8-fpm-alpine

RUN echo "---> Enabling PHP-Alpine" && \
    apk add --update \
    wget \
    curl \
    openssh \
    bash \
    fontconfig \
    libxrender \
    libxext \
    imagemagick \
    nano \
    vim \
    git \
    unzip \
    make \
    sudo

RUN  apk add --update \
    $PHPIZE_DEPS \
    openssl-dev \
    libzip-dev \
    libxslt-dev \
    gettext-dev \
    libpng-dev \
    zlib-dev \
    icu-dev \
    oniguruma-dev \
    postgresql-dev \
    imap-dev \
    php-zlib \
    postgresql-client

# Add crontab file in the cron directory
ADD docker/scheduler/conf/crontab /etc/crontabs/root

# Give execution rights on the cron job
RUN chmod 0644 /etc/crontabs/root

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

RUN docker-php-ext-install pdo_mysql && \
    docker-php-ext-install pdo_pgsql && \
    docker-php-ext-install zip && \
    docker-php-ext-install exif && \
    docker-php-ext-install pcntl

# Run the command on container startup
CMD printenv > /etc/environment && echo "cron starting..." && (crond) && : > /var/log/cron.log && tail -f /var/log/cron.log
