function getUserInfo(user){
    return 
    `<h2>${user.name} <span class="small-name">(@<a href="${user.html-url}" target="_blank">${user.login})</a></span></h2>
    <div class="gh-content">
        <div>
            <a href="${user.html-url}" target="_blank"><img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/></a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following} - Repos: ${user.public_repos}</p>
    
    </div>`
}



function fetchGitHubInformation(event) {

    var username = $("#gh-username").val();

    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(`<div><image src="assets/images/loader.gif" alt="loading..."/></div>`);


    $.when(
            $.getJSON(`https://api.github.com/users/${username}`)
        )
        .then(function(response) {
                var userData = response;
                console.log(response);
                $('#gh-user-data').html(getUserInfo(userData));
            }, function(errorResponse) {
                if (errorResponse.status == 404) {
                    $('#gh-user-data').html(`<h2>No information found for ${username}</h2>`);
                }
                else {
                    console.log(errorResponse);
                    $('#gh-user-data').html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                }
            }

        )

}
