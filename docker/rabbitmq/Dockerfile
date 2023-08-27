FROM rabbitmq:3.8-management-alpine

COPY rabbitmq.conf /etc/rabbitmq
COPY definitions.json /etc/rabbitmq

RUN cat /etc/rabbitmq/rabbitmq.conf

# FROM rabbitmq:3.11.11-management-alpine

# # Enable the RabbitMQ Management plugin
# RUN rabbitmq-plugins enable --offline rabbitmq_management

# # Expose the RabbitMQ Management UI on port 15672
# EXPOSE 15672