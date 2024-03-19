/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : nitnode

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 19/03/2024 11:57:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (7, 2, 1, 20, '2024-02-11 10:23:50');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `status` tinyint(1) NULL DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (5, 'Asus', 'Microsoft product', 1, '2023-11-20 21:52:13');
INSERT INTO `category` VALUES (6, 'Macbook', 'Apple product', 1, '2023-11-21 21:37:51');
INSERT INTO `category` VALUES (7, 'Macbook', 'Apple product', 1, '2023-11-21 21:38:30');
INSERT INTO `category` VALUES (8, 'Macbook', 'Apple product', 1, '2023-11-21 21:38:32');
INSERT INTO `category` VALUES (9, 'Macbook', 'Apple product', 1, '2023-11-21 21:38:33');
INSERT INTO `category` VALUES (10, 'Macbook', 'Apple product', 1, '2023-11-21 21:38:34');
INSERT INTO `category` VALUES (2, 'Macbook', 'Apple product', 1, '2023-11-21 21:38:36');
INSERT INTO `category` VALUES (1, 'Macbook', 'Apple product', 1, '2023-11-21 21:38:37');
INSERT INTO `category` VALUES (13, 'A', 'Des A', 0, '2023-11-21 21:42:09');

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `firstname` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lastname` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `gender` tinyint(1) NOT NULL DEFAULT 1,
  `username` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (14, 0, 'Leng', 'SokpheakTra', 1, '01299990000', '$2b$10$kEXDEEE8C4Kfh4ySO1ZjBetuLnNqElmL6ugYmDUoL412P0N8Aa...', 1, '2023-08-29 21:24:34');
INSERT INTO `customer` VALUES (15, 0, 'Po', 'Boren', 1, '01299990001', '$2b$10$vFTeSREN0oxXv0aT602EgO5b/2mAG2BprYRGQB.vm8RIzc.GI.SOW', 1, '2023-08-29 21:24:47');
INSERT INTO `customer` VALUES (18, 0, 'Yuy', 'Panhareach', 1, '01299990004', '$2b$10$moXvY0DBZ6Nr.UsIZg5UU.F6he1cLJ4RB.hLcWWJIVmTvdU0wxRO.', 1, '2023-08-29 21:42:41');
INSERT INTO `customer` VALUES (26, 0, 'Yuy', 'Piseth', 1, '010909601', '$2b$10$Dc7fK.YNajmP6rIbzJlmBe0fvxBJ3UUJEvu9jTkhB39.SEpxpvbc2', 1, '2024-02-14 12:42:52');
INSERT INTO `customer` VALUES (27, 0, 'Yuy', 'Piseth168', 1, '011507370', '$2b$10$jdbvCd.2qkN9ycUOx/8iSeWzJsRmXhF.sxi8R5GTgaqOl0qd67YsG', 1, '2024-02-14 12:47:06');

-- ----------------------------
-- Table structure for customer_address
-- ----------------------------
DROP TABLE IF EXISTS `customer_address`;
CREATE TABLE `customer_address`  (
  `customer_address_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `province_id` int NOT NULL,
  `firstname` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lastname` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `tel` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address_des` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_address_id`) USING BTREE,
  INDEX `fk_customer`(`customer_id` ASC) USING BTREE,
  CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_address
-- ----------------------------
INSERT INTO `customer_address` VALUES (14, 14, 1, 'Po', 'Boren', '01299990000', '#123 , st34, ...', '2023-08-29 21:24:34');
INSERT INTO `customer_address` VALUES (15, 15, 1, 'Po', 'Boren', '01299990001', '#123 , st34, ...', '2023-08-29 21:24:47');
INSERT INTO `customer_address` VALUES (18, 18, 1, 'Po', 'Boren', '01299990004', '#123 , st34, ...', '2023-08-29 21:42:41');
INSERT INTO `customer_address` VALUES (26, 27, 1, 'Yuy', 'Piseth', '011507370', 'Hello My bro', '2024-02-14 12:47:06');

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lastname` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `tel` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `base_salary` decimal(6, 0) NULL DEFAULT NULL,
  `address` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `province` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `country` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `role_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`employee_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES (8, 'Solo', 'Chan', '012595454', 'borachan@gmail.com', 'employee_image-1710083050155-4391977', 800, '#233 st 122 PP...', 'Battam Bong', 'Cambodia', '2023-07-12 22:15:18', '$2b$10$68V2RxEB3gd.K8QRD.7zyeEayZ0BbNwbCkdE/uRB5GqlyzVR9mBSe', 5);
INSERT INTO `employee` VALUES (10, 'Bora13', 'Chan', '098777665', 'borachan@gmail.com', 'employee_image-1709988757932-198110777', 209, '33 st 122 PP...', 'Battam Bong', 'Cambodia', '2023-07-12 22:15:18', '$2b$10$U13EF/a0wwkJvOPX3kwWoeXIxspLug57M6sc.rxfyxBnObP7cIE/W', NULL);
INSERT INTO `employee` VALUES (12, 'Som', 'Tona', '0998885566', 'tona@gmail.com', 'employee_image-1709997078287-205287874', 1000, '#222 st....', 'BB', 'Cambodia', '2023-07-18 21:57:25', NULL, NULL);
INSERT INTO `employee` VALUES (15, 'Chan', 'Boran', '0998885245', 'boran@gmail.com', 'employee_image-1710083268192-523964607', 1000, '#222 st....', 'BB', 'Cambodia', '2023-07-19 22:05:57', '$2b$10$nUJvndHurxdMVRPVNzD/Du5ZLb3h/HJv7ONuNg0z2rhRRh2Vsuf5G', NULL);
INSERT INTO `employee` VALUES (16, 'Chan', 'Boran', '0998887778', 'boran@gmail.com', 'employee_image-1709965537321-109452102', 1000, '#222 st....', 'BB', 'Cambodia', '2023-07-20 21:40:13', '$2b$10$khr5aemSk94M4mXV.9/1/e1E/A7FFPKuND23QZ3ocqBMQFOtKqmWa', 4);
INSERT INTO `employee` VALUES (17, 'Mr', 'Admin', '011507370', 'dara@gmail.com', 'employee_image-1709965527064-548473726', 1300, '#233 st 122 PP...', 'Battam Bong', 'Cambodia', '2024-02-21 15:36:02', '$2b$10$Y/M55QMWX6UNsK8A5F7aH.Lw3pzXX5C4.8Sj6voRyhyZawX6UmuZm', 1);
INSERT INTO `employee` VALUES (18, 'Bora3', 'Chan3', '098777665', 'borachan3@gmail.com', 'employee_image-1709965518558-341974666', 200, '#233 st 122 PP...', 'PP', 'Cambodia', '2024-03-01 08:34:52', '$2b$10$U13EF/a0wwkJvOPX3kwWoeXIxspLug57M6sc.rxfyxBnObP7cIE/W', NULL);
INSERT INTO `employee` VALUES (20, 'Yuy', 'Panhareach', '012595454', 'reachgoodboy@gmail.com', 'employee_image-1709965511025-802730108', 500, 'pp', 'Battam Bong', 'CAM', '2024-03-06 08:33:09', '$2b$10$68V2RxEB3gd.K8QRD.7zyeEayZ0BbNwbCkdE/uRB5GqlyzVR9mBSe', NULL);
INSERT INTO `employee` VALUES (21, '1', '1', '1', 'reachgoodboy@gmail.com', 'C:\\fakepath\\mac1.png', 1, '1', '1', '1', '2024-03-06 08:51:26', NULL, NULL);
INSERT INTO `employee` VALUES (22, 'Yuy', 'Panhareach', '55475', 'reachgoodboy@gmail.com', 'employee_image-1709690038010-171828124', 1, '1', '1', '1', '2024-03-06 08:53:58', NULL, NULL);

-- ----------------------------
-- Table structure for import
-- ----------------------------
DROP TABLE IF EXISTS `import`;
CREATE TABLE `import`  (
  `import_id` int NOT NULL AUTO_INCREMENT,
  `import_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `supply_id` int NOT NULL,
  `supply_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `employee_id` int NOT NULL,
  `employee_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `import_total` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`import_id`) USING BTREE,
  INDEX `import_ibfk_1`(`supply_id` ASC) USING BTREE,
  INDEX `FK_employee_id`(`employee_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of import
-- ----------------------------
INSERT INTO `import` VALUES (21, '2024-03-01 21:10:14', 0, '', 0, NULL, NULL);
INSERT INTO `import` VALUES (24, '2024-03-01 13:23:10', 2, 'Chim Mong', 17, 'Panhareach', 7000.00);
INSERT INTO `import` VALUES (25, '2024-03-01 13:30:51', 0, 'Rupp', 17, 'Panhareach', 9.00);
INSERT INTO `import` VALUES (26, '2024-03-07 14:49:04', 1, 'KC Ment', 17, 'Panhareach', 1.00);
INSERT INTO `import` VALUES (27, '2024-03-07 22:01:08', 1, 'KC Ment', 17, 'Panhareach', 1.00);
INSERT INTO `import` VALUES (28, '2024-03-07 22:01:53', 1, 'KC Ment', 17, 'Panhareach', 2.00);
INSERT INTO `import` VALUES (29, '2024-03-07 22:02:18', 1, 'KC Ment', 17, 'Panhareach', 2.00);
INSERT INTO `import` VALUES (30, '2024-03-09 07:16:14', 1, 'KC Ment', 17, 'Panhareach', 1000.00);
INSERT INTO `import` VALUES (31, '2024-03-09 07:18:18', 2, 'Chim Mong', 17, 'Panhareach', 10000.00);
INSERT INTO `import` VALUES (32, '2024-03-18 16:31:14', 0, '', 17, 'Panhareach', 0.00);
INSERT INTO `import` VALUES (33, '2024-03-18 19:56:24', 0, '', 17, 'Panhareach', 1.00);
INSERT INTO `import` VALUES (34, '2024-03-18 19:57:45', 0, '', 17, 'Panhareach', 1.00);
INSERT INTO `import` VALUES (35, '2024-03-18 19:59:42', 0, '', 17, 'Panhareach', 0.00);
INSERT INTO `import` VALUES (36, '2024-03-18 20:00:24', 0, '', 17, 'Panhareach', 0.00);
INSERT INTO `import` VALUES (37, '2024-03-18 20:52:35', 3, '1', 17, 'Panhareach', 1.00);

-- ----------------------------
-- Table structure for importdetail
-- ----------------------------
DROP TABLE IF EXISTS `importdetail`;
CREATE TABLE `importdetail`  (
  `import_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `import_quantity` int NOT NULL,
  `import_price` decimal(10, 2) NOT NULL,
  `amount` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`import_id`, `product_id`) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `fk_import_idDetail` FOREIGN KEY (`import_id`) REFERENCES `import` (`import_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_product_idDetail` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of importdetail
-- ----------------------------
INSERT INTO `importdetail` VALUES (21, 1, '1', 1, 1.00, '1');
INSERT INTO `importdetail` VALUES (24, 1, '1', 1, 5000.00, '5000');
INSERT INTO `importdetail` VALUES (24, 2, '2', 2, 1000.00, '2000');
INSERT INTO `importdetail` VALUES (26, 6, 'Macbook', 1, 1.00, '1');
INSERT INTO `importdetail` VALUES (27, 5, 'HP', 1, 1.00, '1');
INSERT INTO `importdetail` VALUES (28, 1, 'Macbook Pro 2013', 1, 1.00, '1');
INSERT INTO `importdetail` VALUES (28, 5, 'HP', 1, 1.00, '1');
INSERT INTO `importdetail` VALUES (29, 1, 'Macbook Pro 2013', 1, 1.00, '1');
INSERT INTO `importdetail` VALUES (29, 5, 'HP', 1, 1.00, '1');
INSERT INTO `importdetail` VALUES (30, 1, 'Macbook Pro 2013', 20, 50.00, '1000');
INSERT INTO `importdetail` VALUES (31, 1, 'Macbook Pro 2013', 500, 20.00, '10000');
INSERT INTO `importdetail` VALUES (33, 1, 'Macbook Pro 2013', 1, 1.00, '1');
INSERT INTO `importdetail` VALUES (37, 2, 'Macbook Pro 2014', 1, 1.00, '1');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `user_id` int NOT NULL,
  `order_status_id` int NOT NULL,
  `payment_method_id` int NOT NULL,
  `order_total` decimal(6, 0) NOT NULL,
  `note` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_paid` int NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (55, 14, 1, 1, 1, 1900, '', '2024-03-10 21:18:42', 1);
INSERT INTO `order` VALUES (56, 14, 1, 1, 2, 500, '', '2024-03-18 21:00:56', 1);
INSERT INTO `order` VALUES (57, 15, 1, 1, 1, 200, '', '2024-03-18 21:09:22', 1);

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details`  (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(6, 0) NOT NULL,
  `discount` decimal(10, 2) NULL DEFAULT NULL,
  `discount_price` decimal(10, 2) NULL DEFAULT NULL,
  `total` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`) USING BTREE,
  INDEX `fk_order_id`(`order_id` ASC) USING BTREE,
  CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 159 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_details
-- ----------------------------
INSERT INTO `order_details` VALUES (150, 55, 42, 'product_image-1709988854912-681274093', 9, 1500, 0.00, 0.00, 13500.00);
INSERT INTO `order_details` VALUES (151, 55, 49, 'product_image-1709988716302-215918550', 10, 100, 0.00, 0.00, 1000.00);
INSERT INTO `order_details` VALUES (152, 55, 50, 'product_image-1709988686794-636644579', 10, 100, 0.00, 0.00, 1000.00);
INSERT INTO `order_details` VALUES (154, 55, 52, 'product_image-1709988592595-920940043', 70, 100, 0.00, 0.00, 7000.00);
INSERT INTO `order_details` VALUES (155, 56, 49, 'product_image-1709988716302-215918550', 9, 100, 0.00, 0.00, 900.00);
INSERT INTO `order_details` VALUES (156, 56, 51, 'product_image-1709988622025-523838251', 9, 100, 0.00, 0.00, 900.00);
INSERT INTO `order_details` VALUES (157, 56, 50, 'product_image-1709988686794-636644579', 9, 100, 0.00, 0.00, 900.00);
INSERT INTO `order_details` VALUES (158, 57, 50, 'product_image-1709988686794-636644579', 8, 100, 0.00, 0.00, 800.00);

-- ----------------------------
-- Table structure for order_status
-- ----------------------------
DROP TABLE IF EXISTS `order_status`;
CREATE TABLE `order_status`  (
  `order_status_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sort_order` int NULL DEFAULT 0,
  PRIMARY KEY (`order_status_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_status
-- ----------------------------
INSERT INTO `order_status` VALUES (1, 'Pending', ' Your order has been placed successfully!.', 1);
INSERT INTO `order_status` VALUES (2, 'Packed', 'Your order has been packed.', 2);
INSERT INTO `order_status` VALUES (3, 'Shipped', 'Your order has been shipped!', 3);
INSERT INTO `order_status` VALUES (4, 'Delivered', 'Your order is complete.', 4);
INSERT INTO `order_status` VALUES (5, 'Canceled', 'order has been canceled.', 5);
INSERT INTO `order_status` VALUES (6, 'Store pick up', 'Your order is ready for store pickup!', 6);
INSERT INTO `order_status` VALUES (7, 'Phone denied', 'Denied Phone denied.', 7);
INSERT INTO `order_status` VALUES (8, 'Cancel', 'Your  has been Canceled.', 8);

-- ----------------------------
-- Table structure for payment_method
-- ----------------------------
DROP TABLE IF EXISTS `payment_method`;
CREATE TABLE `payment_method`  (
  `payment_method_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `code` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `is_active` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`payment_method_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payment_method
-- ----------------------------
INSERT INTO `payment_method` VALUES (1, 'Cash On Delivery', 'cod', 1);
INSERT INTO `payment_method` VALUES (2, 'ABA Bank', 'aba', 1);
INSERT INTO `payment_method` VALUES (3, 'ACLEDA Bank', 'ac', 1);
INSERT INTO `payment_method` VALUES (4, 'Wing', 'wing', 1);
INSERT INTO `payment_method` VALUES (5, 'Chip Mong', 'chm', 1);
INSERT INTO `payment_method` VALUES (6, 'True Money ', 'trm', 1);

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `code` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `group` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`permission_id`) USING BTREE,
  UNIQUE INDEX `code`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES (1, 'Read', 'product.Read', 'product');
INSERT INTO `permission` VALUES (2, 'Create', 'product.Create', 'product');
INSERT INTO `permission` VALUES (3, 'Update', 'product.Update', 'product');
INSERT INTO `permission` VALUES (4, 'Delete', 'product.Delete', 'product');
INSERT INTO `permission` VALUES (5, 'Read', 'order.Read', 'order');
INSERT INTO `permission` VALUES (6, 'Create', 'order.Create', 'order');
INSERT INTO `permission` VALUES (7, 'Update', 'order.Update', 'order');
INSERT INTO `permission` VALUES (8, 'Delete', 'order.Delete', 'order');
INSERT INTO `permission` VALUES (9, 'Read', 'customer.Read', 'customer');
INSERT INTO `permission` VALUES (10, 'Create', 'customer.Create', 'customer');
INSERT INTO `permission` VALUES (11, 'Update', 'customer.Update', 'customer');
INSERT INTO `permission` VALUES (12, 'Delete', 'customer.Delete', 'customer');
INSERT INTO `permission` VALUES (13, 'Read', 'category.Read', 'category');
INSERT INTO `permission` VALUES (14, 'Create', 'category.Create', 'category');
INSERT INTO `permission` VALUES (15, 'Update', 'category.Update', 'category');
INSERT INTO `permission` VALUES (16, 'Delete', 'category.Delete', 'category');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `barcode` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `quantity` int NOT NULL,
  `quantity_alert_stock` int NULL DEFAULT NULL,
  `price` decimal(6, 0) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `create_by` int NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 1, 'P0011689', 'Macbook Pro 2013', 47, 5, 1600, '', 'RAM 8GB, SSD215, 13Inch', 1, '2023-08-22 21:20:29', NULL);
INSERT INTO `product` VALUES (2, 1, 'P002', 'Macbook Pro 2014', 101, 5, 1700, '', 'RAM 8GB, SSD215, 13Inch', 1, '2023-08-22 21:21:07', NULL);
INSERT INTO `product` VALUES (4, 3, 'P004', 'HP-2012', 100, 5, 668, NULL, 'HP 2012 R-8GB SSD-512GB', 1, '2023-09-12 21:45:14', NULL);
INSERT INTO `product` VALUES (5, 3, 'P005', 'Macbooks-aa', 45, 5, 1200, 'product_image-1708181594468-679312890', 'R-8GB, SSD-1T', 1, '2023-09-12 21:47:15', NULL);
INSERT INTO `product` VALUES (6, 1, 'P006', 'Macbook', 101, 5, 1200, 'product_image-1708612884251-576084737', 'R-8GB, SSD-256', 1, '2023-09-12 21:49:31', NULL);
INSERT INTO `product` VALUES (8, 1, 'P007', 'MackBook-2016', 100, 5, 1200, NULL, '8G, SSD-512G', 1, '2023-09-13 21:34:04', NULL);
INSERT INTO `product` VALUES (9, 1, 'P008', 'Macbook.Pro-2016 8GB, 256GB', 10, 55, 120, '', 'Macbook.Pro-2016 8GB, 256GB', 1, '2023-09-18 22:32:15', NULL);
INSERT INTO `product` VALUES (10, 1, 'P008', 'Macbook.Pro-2016 8GB, 512GB', 10, 5, 1400, '', 'Macbook.Pro-2016 8GB, 512GB', 1, '2023-09-18 22:32:47', NULL);
INSERT INTO `product` VALUES (11, 1, 'P0010', 'Macbook.Pro-2016 8GB, 1TB', 10, 5, 1600, '', 'Macbook.Pro-2016 8GB, 1TB', 1, '2023-09-18 22:33:06', NULL);
INSERT INTO `product` VALUES (12, 1, 'P0011', 'Macbook', 0, 5, 1500, 'product_image-1709963605990-659408836', 'Macbook.Pro-2016 16GB, 512GB', 1, '2023-09-18 22:33:40', NULL);
INSERT INTO `product` VALUES (13, 1, 'P0012', 'Macbook.Pro-2017 8GB, 512GB', 10, 5, 1500, '', 'Macbook.Pro-2017 8GB, 512GB', 1, '2023-09-18 22:33:59', NULL);
INSERT INTO `product` VALUES (14, 1, 'P0012', 'Macbook.Pro-2017 16GB, 512GB', 10, 5, 1500, '', 'Macbook.Pro-2017 16GB, 512GB', 1, '2023-09-18 22:34:09', NULL);
INSERT INTO `product` VALUES (15, 1, 'P0012', 'Macbook.Pro-2017 16GB, 1TB', 10, 5, 1500, '', 'Macbook.Pro-2017 16GB, 1TB', 1, '2023-09-18 22:34:23', NULL);
INSERT INTO `product` VALUES (16, 1, 'P0012', 'Macbook.Pro-2018 8GB, 1TB', 0, 5, 1500, '', 'Macbook.Pro-2018 8GB, 1TB', 1, '2023-09-18 22:34:51', NULL);
INSERT INTO `product` VALUES (17, 1, 'P0012', 'Macbook.Pro-2018 8GB, 512TB', 10, 5, 1500, '', 'Macbook.Pro-2018 8GB, 512TB', 1, '2023-09-18 22:35:00', NULL);
INSERT INTO `product` VALUES (18, 1, 'P0012', 'Macbook.Pro-2018 16GB, 512TB', 10, 5, 1500, '', 'Macbook.Pro-2018 16GB, 512TB', 1, '2023-09-18 22:35:17', NULL);
INSERT INTO `product` VALUES (19, 1, 'P0012', 'Macbook.Pro-2019 16GB, 512TB', 10, 5, 1500, '', 'Macbook.Pro-2019 16GB, 512TB', 1, '2023-09-18 22:35:27', NULL);
INSERT INTO `product` VALUES (20, 1, 'P0012', 'Macbook.Pro-2019 16GB, 1TB', 10, 5, 1500, '', 'Macbook.Pro-2019 16GB, 1TB', 1, '2023-09-18 22:35:36', NULL);
INSERT INTO `product` VALUES (21, 4, 'P0012', 'Lenevo', 10, 5, 1500, '', 'EliteBook 8540p 16GB, 512SSD', 1, '2023-09-18 22:35:42', NULL);
INSERT INTO `product` VALUES (22, 1, 'P0012', 'Macbook.Pro-2020 8GB, 1TB', 10, 8, 1500, '', 'Macbook.Pro-2020 8GB, 1TB', 1, '2023-09-18 22:35:52', NULL);
INSERT INTO `product` VALUES (23, 1, 'P0012', 'Macbook', 10, 5, 1500, 'product_image-1709965417101-233376693', 'Macbook.Pro-2020 16GB, 1TB', 0, '2023-09-18 22:35:59', NULL);
INSERT INTO `product` VALUES (24, 1, 'P0012', 'Macbook', 10, 4, 1500, 'product_image-1709965424021-520299625', 'Macbook.Pro-2021 8GB, 256GB', 0, '2023-09-18 22:36:53', NULL);
INSERT INTO `product` VALUES (25, 1, 'P0012', 'Macbook', 10, 5, 1500, 'product_image-1709965431798-229602875', 'Macbook.Pro-2021 8GB, 512GB', 1, '2023-09-18 22:37:09', NULL);
INSERT INTO `product` VALUES (26, 1, 'P0012', 'Macbook', 10, 5, 1500, 'product_image-1709965439889-576657793', 'Macbook.Pro-2021 8GB, 1TB', 0, '2023-09-18 22:37:17', NULL);
INSERT INTO `product` VALUES (27, 1, 'P0012', 'Macbook', 10, 0, 1500, 'product_image-1709965409133-155747797', 'Macbook.Pro-2021 16GB,256GB', 1, '2023-09-18 22:37:37', NULL);
INSERT INTO `product` VALUES (28, 1, 'P0012', 'Macbook', 10, 4, 1500, 'product_image-1709965401598-517467542', 'Macbook.Pro-2021 16GB,512GB', 1, '2023-09-18 22:37:52', NULL);
INSERT INTO `product` VALUES (29, 1, 'P0012', 'Macbook', 10, 5, 1500, 'product_image-1709965392736-581780469', 'Macbook.Pro-2021 16GB,1TB', 1, '2023-09-18 22:38:01', NULL);
INSERT INTO `product` VALUES (30, 1, 'P0012', 'Macbook', 10, 5, 1500, 'product_image-1709965247974-297707067', 'Macbook.Pro-2021 32GB,1TB', 1, '2023-09-18 22:38:40', NULL);
INSERT INTO `product` VALUES (31, 1, 'P0012', 'Macbook', 10, 9, 1500, 'product_image-1709965240159-576229354', 'Macbook.Pro-2022 8GB,256TB', 0, '2023-09-18 22:39:04', NULL);
INSERT INTO `product` VALUES (32, 1, 'P0012', 'Macbook', 10, 2, 1500, 'product_image-1709965232104-240503735', 'Macbook.Pro-2022 8GB,512GB', 1, '2023-09-18 22:39:23', NULL);
INSERT INTO `product` VALUES (33, 1, 'P0012', 'Macbook', 10, 8, 1500, 'product_image-1709965221690-516612434', 'Macbook.Pro-2022 16GB,512GB', 1, '2023-09-18 22:39:33', NULL);
INSERT INTO `product` VALUES (38, 4, 'P0012', 'Macbooks-aa', 40, 3, 1500, 'product_image-1708609738964-941622647', 'EliteBook 2730p 16GB, 512SSD', 1, '2023-09-18 22:48:34', NULL);
INSERT INTO `product` VALUES (39, 4, 'P0012', 'Macbooks-aa', 80, 8, 1500, 'product_image-1708609729083-916320300', 'EliteBook 2740p 16GB, 512SSD', 1, '2023-09-18 22:49:02', NULL);
INSERT INTO `product` VALUES (41, 4, 'P0012345', 'Macbooks-aa', 10, 6, 1500, 'product_image-1708609714072-367881377', 'EliteBook 8440w 16GB, 512SSD', 1, '2023-09-18 22:49:33', NULL);
INSERT INTO `product` VALUES (42, 4, 'P001234', 'Macbooks-aa', 8, 4, 1500, 'product_image-1709988854912-681274093', 'EliteBook 8460p 16GB, 512SSD', 1, '2023-09-18 22:49:49', NULL);
INSERT INTO `product` VALUES (49, 1, 'P0012345', 'Macbook', 8, 0, 100, 'product_image-1709988716302-215918550', '\"I Love You\"', 1, '2024-02-16 20:50:13', NULL);
INSERT INTO `product` VALUES (50, 1, 'P0012345', 'Macbook', 6, 8, 100, 'product_image-1709988686794-636644579', '\"I Love You\"', 1, '2024-02-16 21:01:16', NULL);
INSERT INTO `product` VALUES (51, 1, 'P0012345', 'Macbook', 8, 4, 100, 'product_image-1709988622025-523838251', '\"I Love You\"', 1, '2024-02-16 21:03:20', NULL);
INSERT INTO `product` VALUES (52, 1, 'P0012345', 'Macbook', 69, 2, 100, 'product_image-1709988592595-920940043', '\"I Love You\"', 1, '2024-02-16 22:18:27', NULL);

-- ----------------------------
-- Table structure for product_image
-- ----------------------------
DROP TABLE IF EXISTS `product_image`;
CREATE TABLE `product_image`  (
  `product_image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`product_image_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_image
-- ----------------------------

-- ----------------------------
-- Table structure for province
-- ----------------------------
DROP TABLE IF EXISTS `province`;
CREATE TABLE `province`  (
  `province_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date_modified` datetime NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`province_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of province
-- ----------------------------
INSERT INTO `province` VALUES (1, 'Phnom Penh', 'Delivery in Phnom Penh', '2019-11-05 14:44:42', '2019-08-03 10:00:22');
INSERT INTO `province` VALUES (2, 'Oddar Meancheay (Kerry)', 'Oddar Meancheay', '2019-11-07 14:09:32', '2019-10-24 17:11:46');
INSERT INTO `province` VALUES (3, 'Oddar Meancheay (Other )', 'Oddar Meancheay', '2019-11-07 14:09:16', '2019-10-24 17:20:02');
INSERT INTO `province` VALUES (4, 'Battambang', 'Battambang', '0000-00-00 00:00:00', '2019-11-07 14:05:05');
INSERT INTO `province` VALUES (5, 'Kampong Cham', 'Kampong Cham', '0000-00-00 00:00:00', '2019-11-07 14:05:22');
INSERT INTO `province` VALUES (6, 'Kampong Chhnang', 'Kampong Chhnang', '0000-00-00 00:00:00', '2019-11-07 14:05:38');
INSERT INTO `province` VALUES (7, 'Kampong Som', 'Kampong Som', '0000-00-00 00:00:00', '2019-11-07 14:05:54');
INSERT INTO `province` VALUES (8, 'Kampong Speu', 'Kampong Speu', '0000-00-00 00:00:00', '2019-11-07 14:06:07');
INSERT INTO `province` VALUES (9, 'Kampong Thom', 'Kampong Thom', '0000-00-00 00:00:00', '2019-11-07 14:06:19');
INSERT INTO `province` VALUES (10, 'Kampot', 'Kampot', '0000-00-00 00:00:00', '2019-11-07 14:06:31');
INSERT INTO `province` VALUES (11, 'Kandal', 'Kandal', '0000-00-00 00:00:00', '2019-11-07 14:06:44');
INSERT INTO `province` VALUES (12, 'Kaoh Kong', 'Kaoh Kong', '0000-00-00 00:00:00', '2019-11-07 14:06:58');
INSERT INTO `province` VALUES (13, 'Keb', 'Keb', '0000-00-00 00:00:00', '2019-11-07 14:07:10');
INSERT INTO `province` VALUES (14, 'Kratie', 'Kratie', '0000-00-00 00:00:00', '2019-11-07 14:07:21');
INSERT INTO `province` VALUES (15, 'Mondul Kiri', 'Mondul Kiri', '0000-00-00 00:00:00', '2019-11-07 14:07:33');
INSERT INTO `province` VALUES (16, 'Pailin', 'Pailin', '0000-00-00 00:00:00', '2019-11-07 14:09:47');
INSERT INTO `province` VALUES (17, 'Preah Seihanu', 'Preah Seihanu (Kompong Som or Sihanoukville)', '0000-00-00 00:00:00', '2019-11-07 14:10:22');
INSERT INTO `province` VALUES (18, 'Preah Vihear', 'Preah Vihear', '0000-00-00 00:00:00', '2019-11-07 14:10:36');
INSERT INTO `province` VALUES (19, 'Prey Veng', 'Prey Veng', '0000-00-00 00:00:00', '2019-11-07 14:10:54');
INSERT INTO `province` VALUES (20, 'Pursat', 'Pursat', '0000-00-00 00:00:00', '2019-11-07 14:11:11');
INSERT INTO `province` VALUES (21, 'Ratanak Kiri', 'Ratanak Kiri', '0000-00-00 00:00:00', '2019-11-07 14:11:27');
INSERT INTO `province` VALUES (22, 'Siemreap', 'Siemreap', '0000-00-00 00:00:00', '2019-11-07 14:11:40');
INSERT INTO `province` VALUES (23, 'Stung Treng', 'Stung Treng', '0000-00-00 00:00:00', '2019-11-07 14:11:53');
INSERT INTO `province` VALUES (24, 'Svay Rieng', 'Svay Rieng', '0000-00-00 00:00:00', '2019-11-07 14:12:08');
INSERT INTO `province` VALUES (25, 'Takeo', 'Takeo', '0000-00-00 00:00:00', '2019-11-07 14:12:25');
INSERT INTO `province` VALUES (26, 'Banteay Meanchey', 'Banteay Meanchey', '0000-00-00 00:00:00', '2019-11-07 14:12:34');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `code` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'Admin', 'admin', '2023-08-24 21:59:17');
INSERT INTO `role` VALUES (2, 'Manager', 'manger', '2023-08-24 21:59:17');
INSERT INTO `role` VALUES (3, 'Accountant', 'accountant', '2023-08-24 21:59:17');
INSERT INTO `role` VALUES (4, 'Online Staff', 'online_staff', '2023-08-24 21:59:17');
INSERT INTO `role` VALUES (6, 'Customer', 'customer', '2023-08-28 21:01:31');

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`) USING BTREE,
  CONSTRAINT `FK_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES (1, 1);
INSERT INTO `role_permission` VALUES (1, 2);
INSERT INTO `role_permission` VALUES (1, 3);
INSERT INTO `role_permission` VALUES (1, 4);
INSERT INTO `role_permission` VALUES (1, 5);
INSERT INTO `role_permission` VALUES (1, 6);
INSERT INTO `role_permission` VALUES (1, 7);
INSERT INTO `role_permission` VALUES (1, 8);
INSERT INTO `role_permission` VALUES (1, 9);
INSERT INTO `role_permission` VALUES (1, 10);
INSERT INTO `role_permission` VALUES (1, 11);
INSERT INTO `role_permission` VALUES (1, 12);
INSERT INTO `role_permission` VALUES (1, 13);
INSERT INTO `role_permission` VALUES (1, 14);
INSERT INTO `role_permission` VALUES (1, 15);
INSERT INTO `role_permission` VALUES (1, 16);
INSERT INTO `role_permission` VALUES (2, 5);
INSERT INTO `role_permission` VALUES (2, 6);
INSERT INTO `role_permission` VALUES (4, 1);
INSERT INTO `role_permission` VALUES (4, 4);
INSERT INTO `role_permission` VALUES (4, 5);
INSERT INTO `role_permission` VALUES (4, 9);
INSERT INTO `role_permission` VALUES (4, 13);

-- ----------------------------
-- Table structure for saledetail
-- ----------------------------
DROP TABLE IF EXISTS `saledetail`;
CREATE TABLE `saledetail`  (
  `sale_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sale_quantity` int NOT NULL,
  `sale_price` decimal(10, 2) NOT NULL,
  `sale_amount` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`sale_id`, `product_id`) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `FK_sale_id` FOREIGN KEY (`sale_id`) REFERENCES `tbsale` (`sale_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `saledetail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of saledetail
-- ----------------------------
INSERT INTO `saledetail` VALUES (1, 1, '1', 168, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (1, 2, '1', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (2, 1, '1', 168, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (3, 1, '1', 168, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (3, 2, '1', 168, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (5, 1, '1', 5, 10.00, 10.00);
INSERT INTO `saledetail` VALUES (6, 1, '1', 6, 3.00, 3.00);
INSERT INTO `saledetail` VALUES (6, 2, '1', 2, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (7, 1, '1', 6, 3.00, 18.00);
INSERT INTO `saledetail` VALUES (7, 2, '1', 2, 1.00, 2.00);
INSERT INTO `saledetail` VALUES (8, 1, 'HP-2012', 5, 5.00, 25.00);
INSERT INTO `saledetail` VALUES (8, 2, 'Macbook Pro 2014', 7, 6.00, 42.00);
INSERT INTO `saledetail` VALUES (9, 1, 'Macbook Pro 2013', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (10, 1, 'Macbook Pro 2013', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (11, 1, 'Macbook Pro 2013', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (12, 2, 'Macbook Pro 2014', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (13, 1, 'Macbook Pro 2013', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (13, 2, 'Macbook Pro 2014', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (14, 1, 'Macbook Pro 2013', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (15, 2, 'Macbook Pro 2014', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (16, 2, 'Macbook Pro 2014', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (17, 5, 'HP', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (18, 2, 'Macbook Pro 2014', 1, 1.00, 1.00);
INSERT INTO `saledetail` VALUES (19, 12, 'Macbook', 10, 8.00, 80.00);
INSERT INTO `saledetail` VALUES (19, 16, 'Macbook.Pro-2018 8GB, 1TB', 10, 6.00, 60.00);
INSERT INTO `saledetail` VALUES (20, 1, 'Macbook Pro 2013', 1, 1.00, 1.00);

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier`  (
  `supply_id` int NOT NULL AUTO_INCREMENT,
  `supply_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `supply_contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`supply_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of supplier
-- ----------------------------
INSERT INTO `supplier` VALUES (1, 'KC Ment', '012989989');
INSERT INTO `supplier` VALUES (2, 'Chim Mong', '011789789');
INSERT INTO `supplier` VALUES (3, '1', '1');
INSERT INTO `supplier` VALUES (4, '1', '1');
INSERT INTO `supplier` VALUES (5, '1', '1');
INSERT INTO `supplier` VALUES (6, 'Rupp', '012121212');
INSERT INTO `supplier` VALUES (7, '', '');
INSERT INTO `supplier` VALUES (8, '', '');
INSERT INTO `supplier` VALUES (9, '', '');
INSERT INTO `supplier` VALUES (10, '', '');
INSERT INTO `supplier` VALUES (11, '', '');

-- ----------------------------
-- Table structure for tbsale
-- ----------------------------
DROP TABLE IF EXISTS `tbsale`;
CREATE TABLE `tbsale`  (
  `sale_id` int NOT NULL AUTO_INCREMENT,
  `saleDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `employee_id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `employee_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `customer_id` int NOT NULL,
  `customer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `saleTotal` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`sale_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tbsale
-- ----------------------------
INSERT INTO `tbsale` VALUES (1, '2024-03-01 21:00:23', '17', 'Panhareach', 14, '01299990000', 2000.00);
INSERT INTO `tbsale` VALUES (2, '2024-03-01 21:10:32', '17', 'Panhareach', 14, '01299990000', 2000.00);
INSERT INTO `tbsale` VALUES (3, '2024-03-01 21:10:43', '17', 'Panhareach', 14, '01299990000', 2000.00);
INSERT INTO `tbsale` VALUES (4, '2024-03-02 20:07:15', '17', 'Panhareach', 14, '01299990000', 51.00);
INSERT INTO `tbsale` VALUES (5, '2024-03-02 20:08:24', '17', 'Panhareach', 14, '01299990000', 51.00);
INSERT INTO `tbsale` VALUES (6, '2024-03-02 20:12:32', '17', 'Panhareach', 15, '01299990001', 20.00);
INSERT INTO `tbsale` VALUES (7, '2024-03-02 20:14:30', '17', 'Panhareach', 15, '01299990001', 20.00);
INSERT INTO `tbsale` VALUES (8, '2024-03-02 21:44:26', '17', 'Panhareach', 14, '01299990000', 67.00);
INSERT INTO `tbsale` VALUES (9, '2024-03-07 14:49:54', '17', 'Panhareach', 14, '01299990000', 1.00);
INSERT INTO `tbsale` VALUES (10, '2024-03-07 14:54:09', '17', 'Panhareach', 14, '01299990000', 1.00);
INSERT INTO `tbsale` VALUES (11, '2024-03-07 14:58:40', '17', 'Panhareach', 14, '01299990000', 1.00);
INSERT INTO `tbsale` VALUES (12, '2024-03-07 14:59:36', '17', 'Panhareach', 14, '01299990000', 1.00);
INSERT INTO `tbsale` VALUES (13, '2024-03-07 15:03:28', '17', 'Panhareach', 14, '01299990000', 2.00);
INSERT INTO `tbsale` VALUES (14, '2024-03-07 15:04:53', '17', 'Panhareach', 15, '01299990001', 1.00);
INSERT INTO `tbsale` VALUES (15, '2024-03-07 22:00:41', '17', 'Panhareach', 14, '01299990000', 1.00);
INSERT INTO `tbsale` VALUES (16, '2024-03-08 19:58:17', '17', 'Panhareach', 15, '01299990001', 1.00);
INSERT INTO `tbsale` VALUES (17, '2024-03-08 20:09:52', '17', 'Panhareach', 14, '01299990000', 1.00);
INSERT INTO `tbsale` VALUES (18, '2024-03-09 07:25:36', '17', 'Panhareach', 14, '01299990000', 1.00);
INSERT INTO `tbsale` VALUES (19, '2024-03-09 21:55:53', '17', 'Panhareach', 14, '01299990000', 140.00);
INSERT INTO `tbsale` VALUES (20, '2024-03-18 21:11:33', '17', 'Panhareach', 14, '01299990000', 1.00);

-- ----------------------------
-- Table structure for wishlist
-- ----------------------------
DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE `wishlist`  (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`wishlist_id`) USING BTREE,
  INDEX `PK_product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `PK_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wishlist
-- ----------------------------
INSERT INTO `wishlist` VALUES (1, 1, 2, '2024-02-11 17:58:12');

SET FOREIGN_KEY_CHECKS = 1;
