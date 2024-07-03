#!/bin/bash

mv node_modules node_modules.bak            \
&& rm -fr infra/nodejs                      \
&& npm install --omit=dev                   \
&& mkdir -p infra/lib/layers/nodejs         \
&& mv node_modules infra/lib/layers/nodejs/ \
&& mv node_modules.bak node_modules
