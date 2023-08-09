import Notification from "../notification/notification";
export default abstract class Entity {
  protected _id: string | number;
  public notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string | number {
    return this._id;
  }
  set id(id: string | number) {
    this._id = id;
  }
}
