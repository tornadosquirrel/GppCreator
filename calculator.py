def find_ratios(n):
    closest_y = None
    closest_x = None

    for x in range(100, 1000):
        if x % n == 0:  # x가 n으로 나누어떨어지는지 확인
            y = (6 / 5) * x  # 비율에 따라 y 계산
            if y.is_integer() and y >= 420:  # y가 정수이며 420 이상인지 확인
                if closest_y is None or abs(y - 420) < abs(closest_y - 420):
                    closest_y = int(y)
                    closest_x = x

    if closest_y is not None:
        print(f"x: {closest_x}, y: {closest_y}")
    else:
        print("조건을 만족하는 숫자가 없습니다.")

# 사용자로부터 n 입력 받기
n = int(input("n을 입력하세요: "))
find_ratios(n)