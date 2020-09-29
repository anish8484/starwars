import * as request from 'superagent';

export function getPlanetSuggestions(input, uri, success, error) {
    request.get(uri + input).end((error, response) => {
        if (success) {
            success(response);
        }else if (error && error) {
            error(error);
        }
    });
}

export function getAllPlanets(uri, success, error) {
    request.get(uri).end((error, response) => {
        if (success) {
            success(response);
        } else if (error && error) {
            error(error);
        }
    });
}