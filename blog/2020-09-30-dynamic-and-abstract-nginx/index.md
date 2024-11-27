---
slug: dynamic-and-abstract-nginx
title: Dynamic and Abstract Nginx
authors: aakhtar3
tags: [beginners, tutorial, todayisearched, microservices]
---
# Dynamic and Abstract Nginx

Nginx is a powerful webserver and can built dynamically by injecting environment variables with [envsubst](https://linux.die.net/man/1/envsubst) and importing modular configs with the [include](http://nginx.org/en/docs/ngx_core_module.html#include) directive.

<!-- truncate -->

## envsubst

<img align="center" alt="input/output" src="https://dev-to-uploads.s3.amazonaws.com/i/zi62s911lxxt0yy50dh5.png"></img>

- Create `/etc/nginx/nginx.conf.template` with environment variables `${VAR}`
- Use envsubst to dynamically generate a new `/etc/nginx/nginx.conf`

```
# Define the environment variables
export SERVER='example' LOG='example'

# Run command to generate new nginx.conf
cd /etc/nginx
envsubst '${SERVER},${LOG}' < nginx.conf.template > nginx.conf
```

##### brew install

Mac users will need to install [gettext](https://www.gnu.org/software/gettext/) which includes envsubst.

```
brew install gettext
brew link --force gettext 
```

## Include

From the example above using the sample http config.

> `*` is a wildcard and will match on example.`com`.conf.

```
http {
    ...
    include /etc/nginx/conf.d/example.*.conf;
    ...
}
```

Here is an example folder structure for your Nginx modules.

```
/etc/nginx/
	nginx.conf					# HTTP
	/conf.d						# Server(s)
		example.com.conf		# Can contain multiple servers
		default.conf			# Comes with nginx
		*.conf
	/sites-enabled				# Includes
		/location				# Location Includes
			assets.inc			# /location blocks to static assets
			*.inc
		/SSL					# SSL Includes
			example.com.inc		# Contains SSL directives for example.com
			*.inc
		/*						# You can continue to modularize your code base
			*.inc
```
