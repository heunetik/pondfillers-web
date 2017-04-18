$.getJSON('https://api.planetteamspeak.com/serverstatus/85.236.105.44:10987/', function(json)
{
    if(json.status == 'success')
    {
        $('#name').html("<p class='shadow'><i class='fa fa-cube'></i>" + json.result.name + "</p>");
        
        // check status
        if(json.result.online)
        {
            $('#status').html('<span class="text-success"><p class="shadow">Online</p></span>');
        }
        else
        {
            $('#status').html('<span class="text-danger"><p class="shadow">Offline</p></span>');
        }
        
        $('#users').html("<p class='shadow'>" + json.result.users + ' / ' + json.result.slots + "</p>");
        
        if(json.result.password)
        {
            $('#password').html('<span class="text-danger"><p class="shadow">Yes</p></span>');
        }
        else
        {
            $('#password').html('<span class="text-success"><p class="shadow">No</p></span>');
        }
        
        if(json.result.createchannels)
        {
            $('#createchannels').html('<span class="text-success"><p class="shadow">Anyone</p></span>');
        }
        else
        {
            $('#createchannels').html('<span class="text-danger"><p class="shadow">Admins only</p></span>');
        }
    }
    else
    {
        $('#status').html('<span class="text-danger"><p class="shadow">' + json.result.message + '</p></span>');
    }
});
