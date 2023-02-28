echo "Removing old container and image..."

docker kill client
docker rm -f client
docker rmi -f donation_blockchain_client

echo "Building new image..."
docker build . -t donation_blockchain_client

echo "Running new container..."
docker run --env-file=.env --name client --detach donation_blockchain_client
