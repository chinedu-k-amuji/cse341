// This where my logic for the application will go

const adaRoute = (req, res) => {
    res.send("Hello Ada.");
}; 

const chineduRoute = (req, res) => {
    res.send("Hello Chinedu.");
};

module.exports = {
adaRoute,
chineduRoute
};