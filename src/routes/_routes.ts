import Home from "./Home.svelte";
import Menus from "./Menus.svelte";
import Wine from "./Wine.svelte";
import Beer from "./Beer.svelte";
import Liqueur from "./Liqueur.svelte";
import Tapas from "./Tapas.svelte";
import Cocktail from "./Cocktail.svelte";
import Reviewers from "./Reviewers.svelte";

export const appRoutes = [
  { path: "/", component: Home },
  { path: "/menus", component: Menus },
  { path: "/menus-outside", component: Menus },
  { path: "/menus/wine", component: Wine },
  { path: "/menus/wine/:type", component: Wine, 
    props: (params) => ({ type: params.type })
  },
  { path: "/menus/beer", component: Beer },
  { path: "/menus/liqueur", component: Liqueur },
  { path: "/menus/tapas", component: Tapas },
  { path: "/menus/cocktail", component: Cocktail },
  { path: "/reviewers/register", component: Reviewers },
  { path: "/reviewers/register-event", component: Reviewers },
];