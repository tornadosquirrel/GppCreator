def find_ratios(n):
    closest_y = None

    for x in range(100, 1000):
        if x % n == 0:  # x가 n으로 나누어떨어지는지 확인
            y = (6 / 5) * x  # 비율에 따라 y 계산
            if y.is_integer() and y >= 420:  # y가 정수이며 420 이상인지 확인
                closest_y = int(y)
                break  # 조건을 만족하는 y를 찾았으므로 반복 종료

    return closest_y is None  # 조건을 만족하지 않으면 True 반환

# n을 2부터 ?까지 테스트
for n in range(2, 1090):
    if find_ratios(n):
        print(f"조건을 만족하지 않는 n: {n}")