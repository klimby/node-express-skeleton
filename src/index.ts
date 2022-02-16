import { Container }  from 'typedi';
import { AppService } from './providers/app.service';

const app = Container.get(AppService);
app.startServer();



