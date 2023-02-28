import { Router } from 'itty-router';
const data = require('./polling_units');

// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
router.get('/api/lgas', async (request, env) => {
	return new Response(
		JSON.stringify({
			name: state,
			data: [...new Map(data.default.map(item => [item['lga'], item])).values()].filter(
				item =>
					item.state.toLowerCase().replaceAll(' ', '') ==
					request.cf.state.toLowerCase().replaceAll(' ', '')
			),
		})
	);
});

router.get('/api/pu', async (request, env) => {
	const result = await fetch(
		`https://eefcfptfqmkvqdckwmfk.supabase.co/rest/v1/results?delim=eq.${request.cf.pu}&select=*`,
		{
			headers: {
				'apikey': env.SUPABASE_API_KEY,
				'Authorization': 'Bearer ' + env.SUPABASE_ANON_KEY,
				'Content-Type': 'application/json',
			},
		}
	);

	return new Response(
		JSON.stringify({
			...data.find(
				item =>
					item.delim.toLowerCase().replaceAll(' ', '') ==
					request.cf.pu.toLowerCase().replaceAll(' ', '')
			),
			data: await result.json(),
		})
	);
});

router.get('/api/pus', async (request, env) => {
	return new Response(
		JSON.stringify({
			name: ward,
			data: [...new Map(data.default.map(item => [item['pu'], item])).values()].filter(
				item =>
					item.ward.toLowerCase().replaceAll(' ', '') ==
					request.cf.ward.toLowerCase().replaceAll(' ', '')
			),
		})
	);
});

router.get('/api/states', () => {
	return new Response(
		JSON.stringify({
			data: [...new Map(data.default.map(item => [item['state'], item])).values()],
		})
	);
});

router.get('/api/wards', async (request, env) => {
	return new Response(
		JSON.stringify({
			name: lga,
			data: [...new Map(data.default.map(item => [item['ward'], item])).values()].filter(
				item =>
					item.lga.toLowerCase().replaceAll(' ', '') ==
					request.cf.lga.toLowerCase().replaceAll(' ', '')
			),
		})
	);
});

router.get('/api/jjj', (request, env, context) => {
	return new Response(
		JSON.stringify({
			env,
			context,
		})
	);
});

/*
This shows a different HTTP method, a POST.

Try send a POST request using curl or another tool.

Try the below curl command to send JSON:

$ curl -X POST <worker> -H "Content-Type: application/json" -d '{"abc": "def"}'
*/
router.post('/api/upload', async (request, env) => {
	// Create a base object with some fields.

	const formData = await request.formData();

	const resp = await fetch(`https://api.tatum.io/v3/ipfs`, {
		method: 'POST',
		headers: {
			'x-api-key': env.TATUM_API_KEY,
		},
		body: formData,
	});

	if (!resp.ok) {
		return new Response('Something went wrong. Please try again later.');
	}

	const data = await resp.json();

	const result = await fetch(`https://eefcfptfqmkvqdckwmfk.supabase.co/rest/v1/results`, {
		method: 'POST',
		headers: {
			'apikey': env.SUPABASE_API_KEY,
			'Authorization': 'Bearer ' + env.SUPABASE_ANON_KEY,
			'Content-Type': 'application/json',
			'Prefer': 'return=minimal',
		},
		body: JSON.stringify({
			delim: formData.get('delim'),
			link: data?.ipfsHash,
		}),
	});

	if (!result.ok) {
		return new Response('Something went wrong. Please try again later.');
	}

	return new Response('Success');
});

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: router.handle,
};
