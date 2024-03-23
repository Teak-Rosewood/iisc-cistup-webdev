from ultralytics import YOLO
import torch
import os
HOME = os.getcwd()
print(HOME)
model = YOLO('yolov8x.pt')
model.fuse()
model.save(HOME  + '/model/yolov8x.pt')