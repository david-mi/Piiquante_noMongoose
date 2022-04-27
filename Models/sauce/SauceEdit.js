import Sauce from './Sauce.js';
import sauceSchema from '../schemas/sauceSchema.js';
import Connection from '../../database.js';

class SauceEdit extends Sauce {

  constructor(userIdToken) {
    super(userIdToken);
  }

  async dbReplace(dbSauceId) {
    const dbSauces = Connection.getCollection('sauces');
    await dbSauces.replaceOne({ _id: dbSauceId }, this);
  }

  async validateEdit(dataBaseSauce, parsedSauce) {
    const { name, manufacturer, description, mainPepper, heat } = parsedSauce;
    const updatedSauce = { ...dataBaseSauce, name, manufacturer, description, mainPepper, heat };
    await sauceSchema.validate(updatedSauce);

    return updatedSauce;
  }

  setEdited(data) {
    this.name = data.name;
    this.manufacturer = data.manufacturer;
    this.description = data.description;
    this.mainPepper = data.mainPepper;
    this.heat = data.heat;
    this.imageUrl ??= data.imageUrl;
    this.likes = data.likes;
    this.dislikes = data.dislikes;
    this.usersLiked = data.usersLiked;
    this.usersDisliked = data.usersDisliked;
  }
}

export default SauceEdit;