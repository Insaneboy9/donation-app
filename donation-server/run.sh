echo "Removing old container and image..."

docker kill donation_server
docker rm -f donation_server
docker rmi -f donation_server_image

echo "Building new image..."
docker build . -t donation_server_image

echo "Running new container..."
docker run --name donation_server -p 8080:8080 --detach donation_server_image
