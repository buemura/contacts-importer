FROM rabbitmq:3.9.6-management-alpine

# Enable the RabbitMQ Management plugin
RUN rabbitmq-plugins enable --offline rabbitmq_management

# Expose the RabbitMQ Management UI on port 15672
EXPOSE 15672
