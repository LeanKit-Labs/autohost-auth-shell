// by supplying an implementation to these operations for your backing store
// the action, user and role modules should be able to fulfill all
// calls necessary to complete the API
var _ = require( 'lodash' ),
	path = require( 'path' ),
	nedb = require( 'nedb' ),
	when = require( 'when' ),
	nodeWhen = require( 'when/node' );

function count( api, pattern ) {
	return api.count( pattern );
}

function fetch( api, pattern, map, continuation ) {
	var continuation = continuation || { sort: {} },
		map = map || function( x ) { return x; },
		apply = function( list ) { return _.map( list, map ); },
		op = api.raw.find( pattern ).sort( continuation.sort ),
		promise = // ?;
	return when.try( apply, promise );
}

function fetchPage( api, pattern, map, continuation ) {
	var limit = continuation.limit ? continuation.limit : continuation,
		pageIndex = continuation.page ? continuation.page : 1,
		skipCount = ( pageIndex -1 ) * limit,
		sort = continuation.sort || {},
		map = map || function( x ) { return x; },
		apply = function( list ) {
			return _.map( list, map ); 
		};
		var promise = // ?
	return when.try( apply, promise )
				.then( function( data ) {
					data.continuation = { limit: limit, page: pageIndex, sort: sort };
					data.continuation.page ++;
					return data;
				} )
				.then( null, function( e ) {
					console.log( e.stack );
				} )
				.catch( function( e ) {
					console.log( e.stack );
				} );
}

function insert( doc ) {
	
}

function purge( key, all ) {
	
}

function update( pattern, change ) {
	
}

function upsert( pattern, doc ) {
	
}

module.exports = function( container ) {
	
	return {
		count: count,
		fetch: fetch,
		fetch: function( pattern, map, continuation ) {
			if( ( _.isObject( continuation ) && continuation.limit ) || _.isNumber( continuation ) ) {
				return fetchPage( api, pattern, map, continuation );
			} else {
				return fetch( api, pattern, map, continuation );
			}	
		},
		insert: insert,
		purge: purge,
		update: update,
		upsert: upsert
	};
};