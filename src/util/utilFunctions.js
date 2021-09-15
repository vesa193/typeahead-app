export const fetchRequest = (url, ...params) => {
    fetch(url, params)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response.json();
        })
        .then(data => data)
        .catch(function(error) {
            if (error) {
                return null;
            }
        });
};