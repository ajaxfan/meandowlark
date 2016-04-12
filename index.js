// 引入Express框架
var express = require('express');
// 创建Express实例
var app = express();
// 使用模板引擎express-handlebars，这个引擎对HTML的改写比较轻。
// 同时我们设置了默认的布局为main。这意味着除非特别指明，否则所有视图都会使用这一布局
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});

// 定义模板引擎
app.engine('handlebars', handlebars.engine);
// 定义视图引擎
app.set('view engine', 'handlebars');
// 定义要坚挺的接口
app.set('port', process.env.PORT || 3000);

// 设置静态资源文件路径 (这里使用了static中间件，它会将静态资源文件原样发送到客户端)
// 因为静态资源文件是客户端可以直接访问的，因此它的文件夹名称为public
app.use(express.static(__dirname + '/public'));

//////////////////////////////////////////////////////////   定义全局变量

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what yout don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

//////////////////////////////////////////////////////////   系统映射设置

// 创建URL映射
app.get('/', function(req, res) {
	// res.type('text/plain');
	// res.send('Meanlark Travel');
	res.render('home');
});

app.get('/about', function(req, res) {
	// res.type('text/plain');
	// res.send('About Meanlark Travel');
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {'fortune': randomFortune});
});
// 定制404页面
app.use(function(req, res, next) {
	// res.type('text/plain');
	res.status(404);
	// res.send('404 - Not Found');
	res.render('404');
});

// 定制500页面
app.use(function(err, req, res, next) {
	// console.err(err.stack);
	// res.type('text/plain');
	res.status(500);
	// res.send('500 - Server Error');
	res.render(500);
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl + C to terminate.');
});