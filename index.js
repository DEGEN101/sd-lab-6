const express = require("express");
const app = express ();
app.use(express.json());

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[+] Server Live on http://localhost:${PORT}`);
});

const cars = require("./cars.json");


app.get("/", (request, response) => {
    response.status(200).send("Cars API");
});


app.get("/cars", (request, response) => {
    response.status(200).send(cars);
});


app.get("/cars/:id", (request, response) => {
    const { id } = request.params;
    const targetCar = cars.find(car => car.id === parseInt(id));

    if (!targetCar) {
        response.status(404).send(`Car with the requested id: ${id} doesn't exist.`);
    }
    else {
        response.status(200).send(targetCar);
    }
});


app.post("/cars/add", (request, response) => {
    const carDetails = request.body;

    const newCar = {
        "id": cars.length + 1,
        "make": carDetails["make"],
        "model": carDetails["model"],
        "year": carDetails["year"],
        "color": carDetails["color"],
        "engineType": carDetails["engineType"]
    };

    cars.push(newCar);

    response.status(200).send(newCar);
});


app.put("/cars/:id", (request, response) => {
    const { id } = request.params;
    const newCarDetails = request.body;

    const targetCar = cars.find(car => car.id === parseInt(id));

    if (!targetCar) {
        response.status(404).send(`Car with the requested id: ${id} doesn't exist.`);
    }

    else {
        const index = cars.indexOf(targetCar);

        Object.keys(newCarDetails).forEach(key => {
            targetCar[key] = newCarDetails[key];
        });

        cars[index] = targetCar;
        response.status(200).send(targetCar);
    }
});


app.delete("/cars/:id", (request, response) => {
    const { id } = request.params;

    const targetCar = cars.find(car => car.id === parseInt(id));
    if (!targetCar) {
        response.status(404).send(`Car with the requested id: ${id} doesn't exist.`);
    }

    else {
        const index = cars.indexOf(targetCar);

        cars.splice(index, 1);

        response.status(200).send(targetCar);
    }
});


app.put("/cars/:id/:specification", (request, response) => {
    const { id, specification } = request.params;
    const specificationDetails = request.body;

    const targetCar = cars.find(car => car.id === parseInt(id));
    if (!targetCar) {
        response.status(404).send(`Car with the requested id: ${id} doesn't exist.`);
    }

    else {
        const index = cars.indexOf(targetCar);

        targetCar[specification] = specificationDetails[specification];

        cars[index] = targetCar;
        
        response.status(200).send(targetCar);
    }
});


app.delete("/cars/:id/:specification", (request, response) => {
    const { id, specification } = request.params;

    const targetCar = cars.find(car => car.id === parseInt(id));
    if (!targetCar) {
        response.status(404).send(`Car with the requested id: ${id} doesn't exist.`);
    }

    else {
        const index = cars.indexOf(targetCar);

        delete targetCar[specification];

        cars[index] = targetCar;
        
        response.status(200).send(targetCar);
    }
});