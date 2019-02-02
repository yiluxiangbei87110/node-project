# README
## 1. 目录结构
	app 应用代码目录
		controller 控制器目录
		service service层目录，一般是model层的操作集合或者其他业务操作
		model 模型层目录
		route 路由文件目录
    	validation 表单检验目录，一般以资源命名
	
	config 配置文件目录,存放应用程序需要的配置、数据库配置、redis配置
		config.js 应用程序运行需要的配置文件，此文件为忽略文件
		config.example.js 配置文件示例文件，开发之前执行 cp config.example.js ./config.js操作
		db.js 存放数据库mysql、redis的配置文件
		db.example.js 存放数据库mysql、redis的配置示例文件，开发之前执行 cp db.example.js ./db.js操作
	
	library 自己开发的库或者封装的第三方库，例如：错误定义的基类
		apiError.js API错误类
		apiErrorDefines.js API错误的定义与输出code和http状态码
		db.js 数据库mysql和redis操作的封装模块
	
	logs 存放日志文件
		default.yyyy-MM-dd.log 默认记录日志
		error.yyyy-MM-dd.log 错误日志
		exception.yyyy-MM-dd.log 应用程序异常日志(数据库操作异常)
		stats.yyyy-MM-dd.log 系统日志(请求日志、错误日志、异常日志、默认日志)
	
	middleware 中间件目录
		request.js 网络请求中间件，记录请求日志，错误和异常日志，请求耗时记录
		routePermissions.js 路由权限校验中间件，进入controller操作之前对接口进行权限的校验
	
	node_modules npm安装的第三方库存放目录


	sql 记录对数据库表创建、修改，人工增加记录的操作，此目录不会部署到生产环境，命名规范如下：
		V001_CREATE_{tableName}.sql 创建表操作
		V005_ALTER_{tableName}_{XXXX:操作描述}.sql 修改表操作
		V010_ADD_{tableName}_{XXXX:操作描述}.sql 表添加记录操作
		V011_DELETE_{tableName}_{XXXX:操作描述}.sql 表删除记录操作
		tableName命名规范：
			资源表 t_xxx  (例如 t_user)
            配置表  t_xxx_config  (例如 t_category_config)
            记录表  t_xxx_record  (例如 t_invite_record)
            资源关系表  t_xxx_xxx   (例如 t_user_book, 对应资源为 user_books)
		
	util 工具目录
		logger.js 日志工具
			日志级别
				trace: 
				debug: 对应用程序调试使用的日志。
				info: 打印一些认为重要的信息便于查看或者统计，例如：支付回调数据。
				warn: 程序中自定义的异常信息，主要是用户触发的异常信息，相关人员每天进行收集处理。
				error:	发生错误事件，但是不影响程序运行。相关开发人员 5分钟内 应该进行跟进处理。	
				fatal: 重大错误，这种级别会使程序停止(例如:mysql/redis无法连接),应该发送告警并立即处理。
		response.js 请求输出工具		
		requestValidator.js 请求数据校验工具
	
	app.js 服务应用程序入口文件
	
	package.js 应用包配置文件
	
## 2 数据库和表相关
1. 数据库和表结构（游戏表需要导入表数据，权限表需要导入一个用户数据用来登录）
2. 默认监听端口号4001，数据库名bi_miniprogram
3. 详细具体配置请修改 config/db.js 以及config/config.js 两个文件。

/*
Navicat MySQL Data Transfer

Source Server         : Felix
Source Server Version : 80011
Source Host           : localhost:3306
Source Database       : bi_miniprogram

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2018-08-22 14:16:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_bi_admin_list_record`   用户权限表
-- ----------------------------
DROP TABLE IF EXISTS `t_bi_admin_list_record`;
CREATE TABLE `t_bi_admin_list_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '小程序访问权限单主键',
  `password` varchar(20) NOT NULL DEFAULT '' COMMENT '手机号码',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `openid` varchar(100) NOT NULL DEFAULT '' COMMENT '用户登录微信唯一标识',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '修改时间',
  `status` tinyint(2) DEFAULT NULL COMMENT '设置状态1显示，0不显示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_bi_admin_list_record
-- ----------------------------
INSERT INTO `t_bi_admin_list_record` VALUES ('1', 'wangzhao', 'wangzhao', '', '1533894563974', '1533894563974', '1');



-- ----------------------------
-- Table structure for `t_bi_game_record`  游戏列表
-- ----------------------------
DROP TABLE IF EXISTS `t_bi_game_record`;
CREATE TABLE `t_bi_game_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '游戏名',
  `app_key` varchar(50) NOT NULL COMMENT '游戏对应app_key',
  `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_bi_game_record
-- ----------------------------
INSERT INTO `t_bi_game_record` VALUES ('1', '一起玩吹牛', 1, '1534127820373', '1534127820373');
INSERT INTO `t_bi_game_record` VALUES ('2', '一起戳鼻孔', 2, '1534127820746', '1534127820746');
INSERT INTO `t_bi_game_record` VALUES ('3', '消砖块', 3, '1534127820752', '1534127820752');
INSERT INTO `t_bi_game_record` VALUES ('4', '一起玩连连看', 4, '1534127820757', '1534127820757');
INSERT INTO `t_bi_game_record` VALUES ('5', '猫猫狗狗一起玩', 5, '1534127820761', '1534127820761');
INSERT INTO `t_bi_game_record` VALUES ('6', '一起石头剪子布', 6, '1534127820765', '1534127820765');
INSERT INTO `t_bi_game_record` VALUES ('7', '一起玩是男人就下100层', 7, '1534127820769', '1534127820769');
INSERT INTO `t_bi_game_record` VALUES ('8', '一起翻翻乐', 8, '1534127820773', '1534127820773');
INSERT INTO `t_bi_game_record` VALUES ('9', '一起玩迷宫', 9, '1534127820777', '1534127820777');
INSERT INTO `t_bi_game_record` VALUES ('10', '一起找你妹', 10, '1534127820781', '1534127820781');
INSERT INTO `t_bi_game_record` VALUES ('11', '抢披萨', 11, '1534127820785', '1534127820785');
INSERT INTO `t_bi_game_record` VALUES ('12', '一起飞机大逃亡', 12, '1534127820788', '1534127820788');
INSERT INTO `t_bi_game_record` VALUES ('13', '一起玩像素贪吃蛇', 13, '1534127820792', '1534127820792');
INSERT INTO `t_bi_game_record` VALUES ('14', '一起大灌篮（左右循环）', 14, '1534127820796', '1534127820796');
INSERT INTO `t_bi_game_record` VALUES ('15', '一起街头篮球（横向推进）', 15, '1534127820800', '1534127820800');
INSERT INTO `t_bi_game_record` VALUES ('16', '射击方块', 16, '1534127820803', '1534127820803');
INSERT INTO `t_bi_game_record` VALUES ('17', '一起摸金币',17, '1534127820809', '1534127820809');



-- ----------------------------
-- Table structure for `t_bi_analysis_report_record`   记录列表
-- ----------------------------
DROP TABLE IF EXISTS `t_bi_analysis_report_record`;
CREATE TABLE `t_bi_analysis_report_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL DEFAULT '' COMMENT '分析报告内容',
  `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `status` tinyint(2) DEFAULT NULL COMMENT '设置状态1显示，0不显示',
  `update_time` bigint(20) NOT NULL COMMENT '修改时间',
  `record_time` bigint(20) NOT NULL COMMENT '记录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for `t_bi_income_record`  收入列表
-- ----------------------------
DROP TABLE IF EXISTS `t_bi_income_record`;
CREATE TABLE `t_bi_income_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app_key` varchar(50) NOT NULL DEFAULT '' COMMENT '游戏 appKey',
  `type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '收入类型，10:游戏收入， 11:广告收入， 0:其他',
  `money` double NOT NULL DEFAULT '0' COMMENT '收入金额',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  `update_time` bigint(20) NOT NULL COMMENT '修改时间',
  `status` tinyint(2) DEFAULT NULL COMMENT '设置状态1显示，0不显示',
  `record_time` bigint(20) NOT NULL COMMENT '记录时间',
  `ext` varchar(255) DEFAULT NULL COMMENT '所有字段信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100000537 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `t_bi_outcome_record`  支出列表
-- ----------------------------
DROP TABLE IF EXISTS `t_bi_outcome_record`;
CREATE TABLE `t_bi_outcome_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app_key` varchar(50) NOT NULL DEFAULT '' COMMENT '游戏 appKey',
  `type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '支出类型，20:MP消耗 21:外来消耗，22:群投消耗 0:其他',
  `money` double NOT NULL DEFAULT '0' COMMENT '收入金额',
  `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `status` tinyint(2) DEFAULT NULL COMMENT '设置状态1显示，0不显示',
  `record_time` bigint(20) NOT NULL COMMENT '记录时间',
  `ext` varchar(255) DEFAULT NULL COMMENT '所有字段信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=680 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `t_bi_white_list_record`  白名单列表
-- ----------------------------
DROP TABLE IF EXISTS `t_bi_white_list_record`;
CREATE TABLE `t_bi_white_list_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '白名单主键',
  `telephone` varchar(20) NOT NULL DEFAULT '' COMMENT '手机号码',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `openid` varchar(100) NOT NULL DEFAULT '' COMMENT '用户登录微信唯一标识',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '修改时间',
  `status` tinyint(2) DEFAULT NULL COMMENT '设置状态1显示，0不显示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8;

