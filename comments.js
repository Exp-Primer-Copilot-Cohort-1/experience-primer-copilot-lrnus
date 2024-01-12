// Create web server
var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Get comments
router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM comments";
    db.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
});

// Get comment by id
router.get('/:id', function(req, res, next) {
    var sql = "SELECT * FROM comments WHERE id = ?";
    db.query(sql, [req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
});

// Add comment
router.post('/', urlencodedParser, function(req, res, next) {
    var sql = "INSERT INTO comments (id, user_id, post_id, content, created_at, updated_at) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
    db.query(sql, [req.body.user_id, req.body.post_id, req.body.content], function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Update comment
router.put('/:id', urlencodedParser, function(req, res, next) {
    var sql = "UPDATE comments SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    db.query(sql, [req.body.content, req.params.id], function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Delete comment
router.delete('/:id', function(req, res, next) {
    var sql = "DELETE FROM comments WHERE id = ?";
    db.query(sql, [req.params.id], function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;