//Подключаем галп
const gulp = require("gulp");
//Оптисизация стилей
const del = require("del");
//Объединение файлов
const concat = require("gulp-concat");
//Синхронизация с браузером
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const less = require("gulp-less");


//Таск для обработки стилей
gulp.task("styles", () => {
  //Шаблон для поиска файлов CSS
  //Всей файлы по шаблону './src/css/**/*.css'
  return (
    gulp
      .src(["./src/less/main.less"])
      // обработчик ошибок
      .pipe(plumber())
      //Указать stylus() , sass() или less()
      .pipe(less())
      //Объединение файлов в один
      .pipe(concat("style.css"))
      //Добавить префиксы
      // генерацю не миниф стилей в папку source
      .pipe(gulp.dest("./src/css"))
      //Выходная папка для стилей
      .pipe(gulp.dest("./build/css"))
      .pipe(browserSync.stream())
  );
});

//Таск для очистки папки build
gulp.task("del", () => {
  return del(["build/*"], { dryRun: true });
});

gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
  });
  //Следить за файлами со стилями с нужным расширением
  gulp.watch("./src/less/**/*.less", gulp.series("styles"));
  gulp.watch("./build/*.html").on("change", browserSync.reload);
});

//Таск по умолчанию, Запускает del, styles, scripts и watch
gulp.task("start", gulp.series("del", gulp.parallel("styles"), "watch"));

