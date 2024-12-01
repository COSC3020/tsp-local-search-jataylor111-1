function tsp_ls(distance_matrix) {
    // Empty or matrix of one
    if (distance_matrix.length == 0 || distance_matrix.length == 1) {
        return 0;
    }

    // Just start with the nodes themselves, won't be ideal, doesn't have to be
    let currentRoute = Object.keys(distance_matrix);
    let currentLength = routeLen(currentRoute, distance_matrix);
    // Get a max number of iterations that makes sense and can change based on the size of the matrix
    // distance_matrix.length squared seems to be what makes the most sense for both a reasonable number of iterations 
    // and making sure there are enough of them
    let maxIterations = distance_matrix.length ** 2;
    // console.log("Max Iterations: " + maxIterations);

    for(let j = 1; j < maxIterations; j++) { // Runs for length squared, so time complexity n^2
        // Just choose i and k randomly, odds that they're the same are low
        let i = Math.floor(Math.random() * distance_matrix.length);
        let k = Math.floor(Math.random() * distance_matrix.length);
        // Ensure that they aren't the same, smaller matrices are tough on the random implementation
        // Gave it a maximum runtime cause in theory it could go infinite, using the length of the array because I'm unsure what would be a suitible 
        // amount of iterations for this one
        let iters = 0
        while(i == k || iters < distance_matrix.length) { // Could run the length of the matrix, time complexity n
            i = Math.floor(Math.random() * distance_matrix.length);
            k = Math.floor(Math.random() * distance_matrix.length);
            iters++
        }

        // Perform the 2-opt swap
        let newRoute = twoOpt(currentRoute, i, k);
        let newLength = routeLen(newRoute, distance_matrix);
        // console.log("New Length: " + newLength);

        if (newLength < currentLength) {
            currentRoute = newRoute;
            currentLength = newLength;
        }
    }

    return currentLength;
}

// Helper function to calculate the total length of a route
function routeLen(route, distanceMatrix) {
    let length = 0;
    for (let i = 0; i < route.length - 1; i++) {
        length += distanceMatrix[route[i]][route[i + 1]];
    }
    // console.log("Calculated length: " + length);
    return length;
}

// Helper function to perform the 2-opt 
function twoOpt(route, i, k) {
    let newRoute = [];
    // Each of these are based on a number from 1 to length of distance_matrix, space complexity n for each so 3n
    for (let j = 0; j < i; j++) {
        newRoute.push(route[j]); 
    }
    for (let j = k; j >= i; j--) {
        newRoute.push(route[j]);
    }
    for (let j = k + 1; j < route.length; j++) {
        newRoute.push(route[j]); 
    }
    return newRoute;
}

// let dm1 = [
//     [0, 2, 9, 10],
//     [1, 0, 6, 4],
//     [15, 7, 0, 8],
//     [6, 3, 12, 0]
// ];
// let dm2 = [
//     [0, 5, 0, 8, 3],
//     [5, 0, 7, 2, 1],
//     [0, 7, 0, 6, 4],
//     [8, 2, 6, 0, 9],
//     [3, 1, 4, 9, 0]
// ];
// let dm3 = [
//     [0, 7],
//     [7, 0]
// ];


// console.log("Shortest tour length: " + tsp_ls(dm1));
// console.log("Shortest tour length: " + tsp_ls(dm2));
// console.log("Shortest tour length: " + tsp_ls(dm3));
