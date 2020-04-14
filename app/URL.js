export function getURL(location){
    if (location === 'local')
        return 'https:10.0.2.2:5001/'
    else if (location === 'aws')
        return 'http://kc499.us-west-2.elasticbeanstalk.com/'
}