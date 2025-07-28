<script lang="ts">
	import "./app.css";
	import routes from "./routes";
  	import { Router, Link, Route, useLocation } from "svelte-routing";
	// import Button from "./lib/components/ui/button/button.svelte";
	import Home from "./routes/Home.svelte";
	import Nav from "./layout/nav/Nav.svelte";
	import Menus from "~/routes/Menus.svelte";
	import MenuItem from "~/layout/menus/item/MenuItem.svelte";
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";
	import Loading from "./components/ui/Loading.svelte";
	import { cubicIn } from "svelte/easing";
	import Wine from "./routes/Wine.svelte";
	import Beer from "./routes/Beer.svelte";
	import Liqueur from "./routes/Liqueur.svelte";
	import Tapas from "./routes/Tapas.svelte";
	import Reviewers from "./routes/Reviewers.svelte";
	import { getOrderId, noPush, orderId, saleDate, tableId } from "./layout/stores.svelte";
	import queryString from "query-string";
	import { createJWT, generateSecretKey, verifyJWT } from "./components/utils/crypto";
    import { getSaleDate, stringToBoolean } from "./layout/stores-utils.svelte";
    import Cocktail from "./routes/Cocktail.svelte";
	import { appRoutes } from "./routes/_routes";

	
  	let url= '';
	let loading= $state(false)
  	const location= useLocation()


	/* const secretKey = import.meta.env.VITE_JWT_SECRET_KEY; // 서버와 동일한 비밀키 사용
	const payload = {
		userId: 123,
		iat: Math.floor(Date.now() / 1000), // 발행 시간 (Unix Timestamp)
		exp: Math.floor(Date.now() / 1000) + 10, // 만료 시간 (1시간 후)
	};

	createJWT(payload, secretKey).then((jwt) => {
		console.log("✅ 생성된 JWT:", jwt);
		verifyJWT(jwt, secretKey).then((decodedPayload) => {
			if (decodedPayload) {
				console.log("🔍 디코딩된 데이터:", decodedPayload);
			}
		});
	}); */

	
	
	onMount( async ()=> {
		$inspect($noPush)
		const parsed:any = queryString.parse(window.location.search);
		console.log(parsed, parsed?.tid)
		if( parsed && parsed?.tid) {
			

			if( parsed?.nopush ){
				// console.log(parsed?.nopush, stringToBoolean(parsed?.nopush))
				const nopush= parsed?.nopush;
				noPush.set(stringToBoolean(parsed?.nopush))
			}

			const tid= parsed?.tid
			tableId.set(parsed?.tid)
			const currentDate= getSaleDate().format('YYYY-MM-DD')
			saleDate.set(currentDate)

			const qry= queryString.stringify({ tid, status: 'use', sale_date: currentDate })
			const currentOg= await getOrderId(qry)

			let url = new URL(window.location.href);
			let params = new URLSearchParams(url.search);
			console.log(params)
			params.delete('tid');
			params.delete('nopush');
			url.search = params.toString();
			history.replaceState({}, null, url);
		}
	})
</script>


<Router {url} 
	viewtransition={(r:any) => {
		// console.log(r, history, window.location, window.location.pathname, 'routing')
		// const regex = /^\/menus\/wine(\/.*)?$/;
		// // const regex = /^\/menus\/wine\/.*$/;
		
		// if( 
		// 	// r.direction == 'in' || 
		// 	r.direction == 'out' 
		// 	&& !regex.test(window.location.pathname) 
		// ) {
		// 	loading= true
		// 	setTimeout(e=> loading= false, 300)
		// }
		return {}
		// return { duration: 500, easing: cubicIn, css: (t) => `scale:${t};transform-origin:center center;` }
		// return { fn: fade, duration: 500 }
	}}
>
	<Nav/>
	{#if loading}
		<div class="w-full min-h-[calc(100dvh-61px)] flex items-center justify-center">
			<div class="w-24 fill-c1">
				<Loading />
			</div>
		</div>
	{/if}
	
	{#if !loading}
		{#each appRoutes as route (route.path)}
			{@const RouteComponent:any = route.component }
			{#if route.props}
				<Route path={route.path} let:params >
					<RouteComponent {...route.props(params)} />
				</Route>

			{:else}
				<Route path={route.path} >
					<RouteComponent />
				</Route>
			{/if}
		{/each}
	{/if}
	
</Router>