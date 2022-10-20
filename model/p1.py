import os
import sklearn 
import os
from sklearn import preprocessing
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error
import pickle

os.chdir('E:\project')
data=pd.read_csv('product1.csv')
print(data)
data=np.array(data)
x=data[:3,:].T
y=data[3:,:].T
reg=LinearRegression()

x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.4)


reg.fit(x_train,y_train)
y_pred=reg.predict(x_test)

print(mean_squared_error(y_pred,y_test))
pickle.dump(reg,open('model1.pkl','wb'))
model1=pickle.load(open('model1.pkl','rb'))


'''plt.scatter(range(0,len(x_test)),y_test.T,color='black')
plt.plot(range(0,len(x_test)),y_pred,color='blue',linewidth=3)
plt.xlabel('month')
plt.ylabel('days')
#plt.xticks(())
#plt.yticks(())
plt.show()'''
