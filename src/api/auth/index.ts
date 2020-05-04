import * as InternalAuth from './internal';
import * as FoursquareAuth from './foursquare';

export default { ...InternalAuth, ...FoursquareAuth };
