import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom';
import { Room } from '../pages/Room';
import { AdminRoom } from '../pages/AdminRoom';
import { Error } from '../components/Error';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
