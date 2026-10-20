<?php
// Local dev only: `php -S localhost:8000 router.php`
// Mirrors the .htaccess rules, which PHP's built-in server ignores.

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (str_starts_with($path, '/partials/')) {
    http_response_code(403);
    exit('Forbidden');
}
if (preg_match('#^/products/([a-z-]+)/$#', $path, $m)) {
    header('Location: /products/' . $m[1], true, 301);
    exit;
}
if (preg_match('#^/products/[a-z-]+$#', $path)) {
    require __DIR__ . '/products/index.php';
    return true;
}
if (preg_match('#^/(who-we-supply|how-to-order|contact)/$#', $path, $m)) {
    header('Location: /' . $m[1], true, 301);
    exit;
}
if (preg_match('#^/(who-we-supply|how-to-order|contact)$#', $path)) {
    require __DIR__ . '/index.php';
    return true;
}
return false; // everything else: serve the file or folder index as usual
