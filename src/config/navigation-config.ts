import { NavigationActions } from 'react-navigation';

interface INavigate {
  routeName: string,
  params?: any
}

let config = null;

export const setNavigator = (nav: any) => {
  if (nav) {
    config = nav;
  }
}


export const navigate = ({ routeName, params }: INavigate) => {
  if (config !== null && routeName) {
    let action = NavigationActions.navigate({ routeName, params });
    config.dispatch(action);
  }
}
export const goBack = () => {
  if (config !== null ) {
    let action = NavigationActions.back({});
    config.dispatch(action);
  }
}