import json

with open('AI_Image_Detector_CNN_2_Final_copy.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

step13_source = [
    '# Step 13: Confusion matrix & classification report\n',
    '\n',
    '# Get true labels and predictions in a single pass to prevent dataset shuffling mismatches\n',
    'y_true = []\n',
    'y_pred_prob = []\n',
    '\n',
    'for images, labels in test_ds:\n',
    '    y_true.extend(labels.numpy().flatten())\n',
    '    y_pred_prob.extend(model.predict(images, verbose=0).flatten())\n',
    '\n',
    'y_true = np.array(y_true)\n',
    'y_pred_prob = np.array(y_pred_prob)\n',
    '\n',
    '# Convert probabilities to class predictions\n',
    'y_pred = (y_pred_prob >= 0.5).astype(int)\n',
    '\n',
    'print("Classification Report:\\n")\n',
    'print(classification_report(\n',
    '    y_true,\n',
    '    y_pred,\n',
    '    target_names=class_names\n',
    '))\n',
    '\n',
    '# Confusion Matrix\n',
    'cm = confusion_matrix(y_true, y_pred)\n',
    '\n',
    'plt.figure(figsize=(7, 6))\n',
    'disp = ConfusionMatrixDisplay(\n',
    '    confusion_matrix=cm,\n',
    '    display_labels=class_names\n',
    ')\n',
    'disp.plot(cmap="Blues")\n',
    'plt.title("Confusion Matrix")\n',
    'plt.show()'
]

step14_source = [
    'wrong_idx = np.where(y_pred != y_true)[0]\n',
    'print("Incorrect predictions:", len(wrong_idx), "out of", len(y_true))\n',
    '\n',
    '# Find incorrect predictions batch by batch to avoid loading all images into memory (prevents crashes!)\n',
    'wrong_images = []\n',
    'wrong_actual = []\n',
    'wrong_predicted = []\n',
    '\n',
    'for images, labels in test_ds:\n',
    '    if len(wrong_images) >= 12:\n',
    '        break\n',
    '    true_lbls = labels.numpy().flatten()\n',
    '    preds = model.predict(images, verbose=0).flatten()\n',
    '    pred_lbls = (preds >= 0.5).astype(int)\n',
    '    \n',
    '    mismatches = np.where(pred_lbls != true_lbls)[0]\n',
    '    for idx in mismatches:\n',
    '        if len(wrong_images) < 12:\n',
    '            wrong_images.append(images[idx].numpy())\n',
    '            wrong_actual.append(class_names[int(true_lbls[idx])])\n',
    '            wrong_predicted.append(class_names[int(pred_lbls[idx])])\n',
    '\n',
    'plt.figure(figsize=(12, 8))\n',
    'for i in range(len(wrong_images)):\n',
    '    plt.subplot(3, 4, i + 1)\n',
    '    plt.imshow(wrong_images[i].astype("uint8"))\n',
    '    plt.title(f"Actual: {wrong_actual[i]}\\nPredicted: {wrong_predicted[i]}", fontsize=9)\n',
    '    plt.axis("off")\n',
    'plt.tight_layout()\n',
    'plt.show()'
]

nb['cells'][34]['source'] = step13_source
nb['cells'][36]['source'] = step14_source

with open('AI_Image_Detector_CNN_2_Final_copy.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2)

print('Notebook successfully updated.')
