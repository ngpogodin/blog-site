module.exports = class UserDto {
    constructot(model) {
        this.email = model.email;
        this.id = model._id;
        this.userName = model.userName;
    }
}