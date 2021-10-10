class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  publish(event, data) {
    this.subscribers
      .filter(
        subscriber => subscriber.event === event
      )
      .forEach(
        subscriber => subscriber.action(data)
      );
  }
}

export default Observer;