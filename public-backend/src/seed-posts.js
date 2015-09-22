import {PostModel} from './data/database';

var lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor nulla erat, sed viverra est rhoncus vel. Vestibulum ut magna blandit, semper arcu in, congue erat. Aliquam sodales vulputate ante dapibus tincidunt. In hac habitasse platea dictumst. Suspendisse at vulputate sapien. Ut facilisis efficitur justo, et condimentum sapien aliquet nec. Mauris vitae justo sapien. Donec pulvinar finibus metus quis volutpat. Cras sed sollicitudin erat, sed scelerisque mauris. Aenean commodo tincidunt metus, non viverra urna porta a.

Quisque mattis nisl in gravida commodo. Aenean et lacinia dui. Maecenas iaculis nibh ante, nec pretium sapien pulvinar sit amet. Pellentesque non porttitor eros. Proin et aliquet sapien, sed posuere mauris. Aenean laoreet ullamcorper ligula, ac porta est bibendum non. Suspendisse purus eros, sodales nec facilisis eu, hendrerit a ipsum. Pellentesque non mauris molestie, condimentum leo non, tristique erat.

Mauris eleifend augue non nunc venenatis ultrices. Aenean tristique volutpat efficitur. Cras porttitor dolor sed velit pharetra porttitor. Nam sem ante, consequat non porta vel, rhoncus id tortor. Cras iaculis sagittis sapien, id elementum nunc vehicula in. In tempor sodales dolor, eget dapibus felis varius eget. Nunc bibendum in nibh non elementum. Nunc faucibus rhoncus urna, vel pharetra velit fermentum eget. Nam porta erat magna, in venenatis lacus tempus vitae. Donec non turpis nec metus tincidunt rhoncus.
`;

var post1 = new PostModel({
  title: 'Top 10 Software Related Trends To Keep In View',
  content: lorem,
  published_at: new Date(2014, 9, 1)
}).save();

var post2 = new PostModel({
  title: '7 Things You Should Know Before Getting Into The Software Industry',
  content: lorem,
  published_at: new Date(2014, 9, 2)
}).save();

var post3 = new PostModel({
  title: 'Understanding The Background Of Software Industry',
  content: lorem,
  published_at: new Date(2014, 9, 3)
}).save();

var post4 = new PostModel({
  title: 'Five Things Your Boss Needs To Know About The Software Industry',
  content: lorem,
  published_at: new Date(2014, 9, 4)
}).save();

var post5 = new PostModel({
  title: 'Five Top Hidden Risks In The Software Industry',
  content: lorem,
  published_at: new Date(2014, 9, 5)
}).save();

var post6 = new PostModel({
  title: '10 Reasons why Foo is in fact Bar',
  content: lorem,
  published_at: new Date(2014, 9, 6)
}).save();

var post7 = new PostModel({
  title: 'Why Apple Products Are Da Bomb',
  content: lorem,
  published_at: new Date(2014, 9, 7)
}).save();