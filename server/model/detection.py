from ultralytics import YOLO
from supervision.tools.detections import Detections
import cv2
def detect_cars (path, name):
    try:
        colors = {
            2: (0, 255, 0),  
            3: (255, 0, 0),  
            5: (0, 165, 255),
            7: (0, 0, 255),  
        }
        counts = {class_id: 0 for class_id in colors.keys()}
        print(counts)
        model = YOLO("model/yolov8x.pt")
        frame = cv2.imread(path + name)
        results = model(frame)
        detections = Detections(
            xyxy=results[0].boxes.xyxy.cpu().numpy(),
            confidence=results[0].boxes.conf.cpu().numpy(),
            class_id=results[0].boxes.cls.cpu().numpy().astype(int)
        )

        for detection in detections:
            class_id = detection[2]
            if class_id in colors:
                counts[class_id] += 1
                box = detection[0]
                color = colors[class_id]
                cv2.rectangle(frame, (int(box[0]), int(box[1])), (int(box[2]), int(box[3])), color, 2)
        cv2.imwrite((path + 'detection_' + name), frame)
        class_names = {
            2: 'Car',
            3: 'Motorcycle',
            5: 'Bus',
            7: 'Truck',
        }
        counts = {class_names[class_id]: count for class_id, count in counts.items() if count >= 0}
        return (path + 'detection_' + name), counts 
    except Exception as e:
        print(e)
        return e, -100
