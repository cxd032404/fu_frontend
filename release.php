<?php
$command = "git checkout master && git status && git pull";
(exec($command,$return));
echo implode("\n",$return)."\n";
unset($return);
$command = "cd ../config && cp indexOnline.js index.js";
(exec($command,$return));
echo implode("\n",$return)."\n";
