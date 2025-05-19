#Bubble sort, repeatedly check pairs for order and correct until all are ordered

def bubble_sort(items):
    for i in range(len(items)):
        #outer loop selects first element, 
        #inner loop runs through every other element and checks if the value is greater than and swaps
        for j in range(0, len(items) - i - 1):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]

if __name__ == "__main__":
    test = [3,4, 23,43,2,34,5,7,44]
    bubble_sort(test)
    print(test)