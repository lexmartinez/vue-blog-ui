<?php
$article = [];
$url = $_SERVER['REQUEST_URI'];

if(strpos($url, '/read/') !== false){

  $key = str_replace("/read/", "", $url);

  $data = array("a" => "a");
  $ch = curl_init("https://hapi-blog.herokuapp.com/v1/articles?key=" . $key);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
  curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($data));
  $response = curl_exec($ch);
  curl_close($ch);
  if(!$response) {
    return false;
  }else{
    $article = json_decode($response);
  }
  print_r('<head><meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="lexmartinez.com" />
<meta name="twitter:title" content="'. $article->{'title'} . '" />
<meta name="twitter:card" content="summary">
<meta name="twitter:description" content="'.$article->{'abstract'}.'" />
<meta name="twitter:image" content="'. $article->{'imageUrl'} . '" />
<meta name="twitter:image:src" content="'. $article->{'imageUrl'} . '">
<meta name=twitter:text:title content="'. $article->{'title'} . '">
<meta name="description" content="'.$article->{'abstract'}.'" />
<meta property="og:description" content="'.$article->{'abstract'}.'" />
<meta property="og:site_name" content="Lex Martinez">
<meta property="og:type" content="article">
<meta property="og:title" content="'. $article->{'title'} . '">
<meta property="og:image" content="'. $article->{'imageUrl'} . '">
<meta property="og:image:alt" content="https://lexmartinez.com/static/favicon.png">
<meta property="og:url" content="https://lexmartinez.com">
<link rel="shortcut icon" type="image/png" href="/static/favicon.png"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon.png">
    <link rel="icon" type="image/png" href="/static/favicon.png" sizes="32x32">
    <link rel="stylesheet" type="text/css" href="/static/main.css">
    <style>
        .sharebox i {
            margin-top:15px;
        }
    </style>
</head>');
}
include ("index.html");
?>
