import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom';
import { Room } from '../pages/Room';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}
